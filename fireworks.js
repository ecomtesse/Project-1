 // array of fireworks
const fireworks = []
const particles = []

class Particle {
    constructor() {
        const  colors = [
            'red',
            'yellow',
            'orange',
            'green',
            'blue',
            'purple',
            'silver',
            'white'    
        ]
        
        this.x = 0
        this.y = 0
        
        //update the speed of the particle here
        this.speed = Math.random() * 2 + 3 
        this.angle = Math.random() * Math.PI * 2
        this.vx = Math.cos(this.angle) * this.speed
        this.vy = -Math.sin(this.angle) * this.speed

        this.el = document.createElement("div")
        this.el.className = 'particle'
        this.el.style.left = this.x + 'px'
        this.el.style.top = this.y + 'px'
        this.el.style.backgroundColor = colors[parseInt(Math.random() * colors.length)]
        document.body.appendChild(this.el)
                
        // Function to remove particle
        //update time delay number to control the length before particle removed
        setTimeout(() => {
            this.el.remove()
            particles.splice(particles.indexOf(this), 1)
        }, 300) 
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
        this.el.style.left = this.x + 'px'
        this.el.style.top = this.y + 'px'
    }

    //update the this.vy number to control the drop off/gravity effect
    update() {
        this.setPosition(this.vx + this.x, this.vy + this.y)
        this.vy += 0.1 
    }
}

class Firework {
    constructor() {
        this.x = window.innerWidth / 2
        this.y = window.innerHeight - 10
        
        //update the speed of the firework here
        this.speed = 11 
        this.angle = (Math.random() * Math.PI / 2) + Math.PI / 4
        this.vx = Math.cos(this.angle) * this.speed
        this.vy = -Math.sin(this.angle) * this.speed

        this.el = document.createElement("div")
        this.el.className = 'firework'
        this.el.style.left = this.x + 'px'
        this.el.style.top = this.y + 'px'
        document.body.appendChild(this.el)
        
        // Function to remove firework
        // Update  delay number to control the length before firework removed
        setTimeout(() => {
            this.el.remove()
            fireworks.splice(fireworks.indexOf(this), 1)
            this.explode()
        }, 1200) 
    }

    // Function to create particles
    // Number of particles is the condition in the loop
    explode() {
        for (let i = 0; i < 50; i++) { 
            const particle = new Particle()
            particle.setPosition(this.x, this.y)
            particles.push(particle)
        }
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        this.el.style.left = this.x + 'px'
        this.el.style.top = this.y + 'px'
        this.vy += 0.15 //update this to control the drop off
    }
}

let fireworks1IntervalID
let fireworks2IntervalID

const startFireworks = () => {
    // Updates fireworks & particles every 10ms
    fireworks1IntervalID = setInterval(() => {
        fireworks.forEach((firework) => firework.update())
        particles.forEach((particle) => particle.update())
    }, 10)

    //creates a new firework ever 150ms and pushes it into the array
    fireworks2IntervalID = setInterval(() => {
        const firework = new Firework()
        fireworks.push(firework)
    }, 150)
}

const endFireworks = () => {
    clearInterval(fireworks1IntervalID)
    clearInterval(fireworks2IntervalID)
}