export interface Prediction {
    label: string;
    probability: number;
}


export interface Result {
    predictions: Prediction[];
    result: string;
    success: boolean;
}