import { HttpMethods } from "@root/constants";
import FormData from "form-data";

export type HttpOptions = {
    method: HttpMethods;
    url: string;
    headers: Record<any, any>;
    params?: Record<any, any>;
    data?: any;
    responseType?: "arraybuffer" | "document" | "json" | "text" | "stream";
};

export type GetOptions = {
    headers?: Record<any, any>;
    data?: any;
    responseType?: HttpOptions["responseType"];
};

export type UrlOptions = {
    protocol: string;
    hostname: string;
    port?: number;
    endpoint?: string;
    prefix?: string;
    path?: string;
};

export type ModuleConfig = UrlOptions & {
    paths: Record<string, { method: HttpMethods; path: string }>;
} & Record<any, any>;

export interface Http {
    getDefaultOptions(url: string, data?: any): Omit<HttpOptions, "method">;
    getOptions(url: string, method: HttpMethods, options?: GetOptions): HttpOptions;
    createUrl(options: UrlOptions, values?: (string | number)[]): string;
    createForm(): FormData;
    get<Type>(options: Omit<HttpOptions, "method"> | string): Promise<Record<string, any> & { data: Type }>;
    post<Type>(options: Omit<HttpOptions, "method">): Promise<Record<string, any> & { data: Type }>;
    request<Type>(options: HttpOptions): Promise<Record<string, any> & { data: Type }>;
}
