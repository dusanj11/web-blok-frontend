export class Accommodation 
{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public address: string,
        public averageGrade: number,
        public latitude: number,
        public longitutde: number,
        public imageURL: string,
        public approved: boolean,
        public placeId: number,
        public accomTypeId: number,
        public appUserId: number){

    }
}
