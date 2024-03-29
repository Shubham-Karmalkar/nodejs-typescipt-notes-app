import { HttpMethods, HttpStatus } from "@root/constants";
import { GenericObj } from "@root/types";
import { formatString } from "@root/utils";
import rawAxios, { AxiosResponse, HttpStatusCode } from "axios";

export type HttpOptions = {
    method: HttpMethods;
    url: string;
    headers: GenericObj;
    validateStatus: any;
    params?: GenericObj;
    data?: any;
    responseType?: "arraybuffer" | "document" | "json" | "text" | "stream";
};

type UrlOptions = {
    protocol: string;
    hostname: string;
    port?: number;
    endpoint?: string;
    prefix?: string;
    path?: string;
};

export type ModuleConfig = UrlOptions & {
    paths: Record<string, { method: HttpMethods; path: string }>;
} & GenericObj;

export class HttpConnector {
    private axios: any;
    constructor() {
        this.axios = rawAxios;
    }

    public getCore() {
        return this.axios;
    }

    public validateStatus(status: HttpStatusCode) {
        return true;
    }

    public getDefaultOptions(url: string, data?: any) {
        const options: Omit<HttpOptions, "method"> = {
            url,
            headers: {
                "Content-Type": "application/json",
            },
            validateStatus: this.validateStatus,
        };
        if (data) options.data = data;
        return options;
    }

    public getOptions(url: string, method: HttpMethods, { headers, data, responseType }: GetOptions = {}) {
        const options: HttpOptions = {
            url,
            method,
            headers: headers || {
                "Content-Type": "application/json",
            },
            validateStatus: this.validateStatus,
        };
        if (data) options.data = data;
        if (responseType) options.responseType = responseType;
        return options;
    }

    public createUrl(options: UrlOptions, values?: (string | number)[]) {
        const { protocol, hostname, port, endpoint, prefix, path } = options;

        let url = `${protocol}//${hostname}${port ? ":" + port : ""}${prefix ? prefix : ""}${endpoint ? endpoint : ""}${
            path ? path : ""
        }`;

        if (values) url = formatString(url, values);

        return url;
    }

    public async get<Type>(options: Omit<HttpOptions, "method"> | string) {
        const updatedOptions = typeof options == "string" ? { url: options } : options;

        return (await this.axios({
            ...updatedOptions,
            method: HttpMethods.GET,
        })) as AxiosResponse<Type>;
    }

    public async request<Type>(options: HttpOptions) {
        return (await this.axios({
            ...options,
        })) as AxiosResponse<Type>;
    }

    public async post<Type>(options: Omit<HttpOptions, "method">) {
        return (await this.axios({
            ...options,
            method: HttpMethods.POST,
        })) as AxiosResponse<Type>;
    }
}

type GetOptions = {
    headers?: GenericObj;
    data?: any;
    responseType?: HttpOptions["responseType"];
};
