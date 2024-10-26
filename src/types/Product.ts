export interface IProduct {
    articul: number;
    model: string;
    capacity: string;
    rated_power: number;
    peak_power: string;
    battery_type: string;
    adapter: string;
    car_charge_input: string;
    sun_charge: string;
    work_temp: string;
    ac_output: string;
    usb_output: string;
    output: string;
    dc_output: string;
    type_c_output: string;
    output_signal: string;
    gross_weight: string;
    rated_frequency: string;
    anderson_output: string;
    battery_rated_frequency: string;
    construction_type: string;
    noise_level: string;
    volume_of_fuel_tank_during_operation: string;
    starting_system: string;
    auto_start: string;
    alternator: string;
    alternator_winding: string;
    engine_model: string;
    engine_type: string;
    engine_volume: string; //см3
    fuel_type: string;
    recommended_oil: string;
    lubrication_volume: string;
    overcurrent_protection: string;
    overvoltage_protection: string;
    overheating_protection: string;
    recharge_protection: string;
    size: string;
    price: number;
    id: number;
    width: number,
    height: number,
    length: number,
    stopped: boolean,
    count: number

    photos: Array<
        {
            id:number,
            source: string,
            product_id: number
        }
    >,

    pdf: Array<{
        id: number,
        source: string,
        product_id: number
    }>

    created_at: Date
    updated_at: Date
}