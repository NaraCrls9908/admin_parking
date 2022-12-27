export interface Parking{
    id: number,
    address: String,
    amenities: String[],
    score: number,
    price: number,
    type: String,
    images: String[],
    description: String
}

export interface ApiResponse{
    title: string,
    status: string, 
    message: string,
    type: string,
    data: Parking[]
}

export interface ApiResponseOne{
    title: string,
    status: string, 
    message: string,
    type: string,
    data: Parking
}