import http from 'http'
import express from 'express'
import io from 'socket.io'
import logger from 'morgan'
import prompt from 'prompt'

const app = express()
const server = http.Server(app)
const socket = io(server)

const PORT = 3000

app.use(logger('dev'))

let clients = [];

const menu = () => {
    prompt.get([{name:'action', required: true}], (err, res) => {
        if(res.action === "step") {
            console.log('Clients : ')
            console.log(Object.keys(clients))
            prompt.get([{name: 'clientId', required:true}, {name: 'step', required: true}], (err, res) => {
                clients[res.clientId].currentStep = res.step
                socket.to(res.clientId).emit('step:change', res.step)
                menu()
            })
        }
        else if(res.action !== 'quit') {
            menu()
        }
    })
}

const timer = (client) => {
    let { minutes, seconds, timer } = clients[client.id]

    if(!seconds) {
        minutes--
        seconds = 59
    }
    else {
        seconds--
    }

    clients[client.id] = {...clients[client.id], minutes: minutes, seconds: seconds}
    socket.to(client.id).emit("timer:tick", clients[client.id])

    if(minutes <= 0 && seconds <= 0) {
        clearInterval(timer)
        socket.to(client.id).emit("timer:timeout");
    }
}

const startTimer = (client) => {
    clients[client.id].timer = setInterval(() => {
        if(!!clients[client.id]) {
            timer(client);
        }
    }, 1000)
}

prompt.start()
menu()

socket.on('connection', (client) => {
    client.on("client:ready", (status) => {
        clients[client.id] = status;
        client.join(client.id);

        if(status.disconnected) {
            clients[client.id] = {...status, ...status.time}
            startTimer(client)
        }

        client.on("step:ready", (time) => {
            clients[client.id] = {...clients[client.id], ...time}
            startTimer(client)
        })

        client.on("step:cleared", (step) => {
            console.log(`client : ${client.id} step ${step} cleared`)
            const {timer} = clients[client.id]
            clearInterval(timer)
            socket.to(client.id).emit("timer:tick", {...clients[client.id], currentStep: step, minutes: 88, seconds: 88})
        })
    })

    client.on("disconnect", () => {
        delete clients[client.id]
    })
})

server.listen(PORT)