export default interface NewJson {
    [key: string]: {
        name: string;
        symbol: string;
        CMC_id: number;
        price: number;
    };
};