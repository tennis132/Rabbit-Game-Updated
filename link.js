class Link
{
    //we are trying to connect 2 bodies that are refered as bodyA and bodyB
    //total length of the rope = 6
    //bodyA = the rope
    //bodyB = the fruit
    // the total length of bodyA = bodyA.body.Bodies.length
    //we need to link the fruit to the fourth rectangle of the rope
    //last link is a variable holding the location of the fourth rectangle
    //pointA is the point of contact of the rope to the fruit
    constructor(bodyA, bodyB)
    {
        var lastLink = bodyA.body.bodies.length - 2
        this.link = Constraint.create({
            bodyA: bodyA.body.bodies[lastLink],
            pointA: {x:0, y:0},
            bodyB: bodyB,
            pointB: {x:0, y:0},
            length: -10,
            stiffness: 0.01

        })
        World.add(engine.world,this.link)
    }

    detach()
    {
        World.remove(engine.world,this.link)
    }
}