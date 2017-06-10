export class RoomReservation {
    constructor(
        public Id: number,
        public RoomId: number,
        public AppUserId: number,
        public StartDate: any,
        public EndDate: any,
        public TimeStamp: any
    ){}
}
