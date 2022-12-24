export interface Parking{
    address: String,
    ammenities: String[],
    score: Number,
    price: Number,
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