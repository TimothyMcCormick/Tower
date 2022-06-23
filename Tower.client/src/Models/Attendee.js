



export class Attendee {
  constructor(data) {
    this.id = data.id || null
    this.name = data.name
    this.email = data.email
    this.picture = data.picture
  }
}