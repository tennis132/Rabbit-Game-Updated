class Ground
{
  constructor(a,b,c,d)
  {
    this.x = a
    this.y = b
    this.w = c
    this.h = d

    var options = 
    {
      isStatic: true
    }
    this.body = Bodies.rectangle(a,b,c,d,options)
    World.add(world, this.body)
  }

  display()
  {
    var pos = this.body.position
    push ()
    rectMode(CENTER)
    fill ("yellow")
    rect(pos.x, pos.y, this.w, this. h)
    pop ()
  }
}