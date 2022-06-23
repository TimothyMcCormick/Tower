



export class TowerEvent {
  constructor(data) {
    this.id = data.id || null
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.type = data.type
  }
}