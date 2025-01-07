export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
    this.bio = data.bio
    // this.coverImg = data.coverImg || "https://images.unsplash.com/photo-1667227283849-24396056348f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyYXklMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
    this.coverImg = data.coverImg
  }
}
