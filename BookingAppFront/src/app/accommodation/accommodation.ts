export class Accommodation
{
    constructor(
        public Id: number,
        public Name: string,
        public Description: string,
        public Address: string,
        public AverageGrade: number,
        public Latitude: number,
        public Longitutde: number,
        public ImageURL: string,
        public Approved: boolean,
        public PlaceId: number,
        public AccomTypeId: number,
        public AppUserId: number){

    }
}
