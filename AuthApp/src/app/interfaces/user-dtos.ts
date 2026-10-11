export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    idRole: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface GetMenuResponse {
    name: string;
    link: string;
}

export interface GetUserResponse {
    name: string;
    email: string;
    role: string;
    menus: GetMenuResponse[];
}