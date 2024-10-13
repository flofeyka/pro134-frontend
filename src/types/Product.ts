export interface IProduct {
    id: number;
    model: string,
    capacity: string,
    rated_power: number,
    peak_power: number,
    battery_type: string,
    adapter: string,
    car_charge_input: string,
    sun_charge: string,
    work_temp: string,
    ac_output: string,
    usb_output: string,
    output: string,
    dc_output: string,
    type_c_output: string,
    output_signal: string,
    gross_weight: string,
    width: number,
    height: number,
    length: number,
    stopped: boolean,
    price: number,
    count: number

    photos: Array<
        {
            id:number,
            source: string,
            product_id: number
        }
    >,

    created_at: Date
    updated_at: Date
}