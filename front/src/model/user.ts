export interface UserLoginInfo {
    email: string;
    password: string;
    session: string;
}

export interface UserProfile {
    name?: string;
    email: string;
    lygrylity?: number;
    rank?: Rank;
    partyList: Party[];
}

export type Rank = 'newbie' | 'expert'

export type Location = 'outdoor' | 'home' | 'online'

// TODO check ISO type
export type Currency = 'RUB' | 'USD'

export type PartyMode = 'single' | 'multiple'

export interface Party {
    dateStart: string;
    dateEnd: string;
    location: Location;
    budget: Money;
    mode: PartyMode;
    note?: string;
    buhlishkoList: BuhlishkoInterface;
    lygrylity?: number;
}

export interface Money {
    amount: number;
    currency: Currency;
}

export interface BuhlishkoInterface {
    name: string;
    amount: number;
    lg: number;
}
