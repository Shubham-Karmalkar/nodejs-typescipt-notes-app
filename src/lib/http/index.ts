import { HttpMethods, HttpStatus } from "@root/constants";
import { GetOptions, Http, HttpOptions, UrlOptions } from "@root/interfaces/http.interface";
import { formatString } from "@root/utils";
import rawAxios, { AxiosResponse, AxiosStatic } from "axios";
import FormData from "form-data";

export class HttpConnector implements Http {
    private axios: AxiosStatic;
    constructor() {
        this.axios = rawAxios;
    }

    public getCore(): AxiosStatic {
        return this.axios;
    }

    public validateStatus(status: HttpStatus) {
        return true;
    }

    public getDefaultOptions(url: string, data?: any) {
        const options: Omit<HttpOptions, "method"> = {
            url,
            headers: {
                "Content-Type": "application/json",
            },
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

    public createForm(): FormData {
        return new FormData();
    }

    @error_handler
    public async get<Type>(options: Omit<HttpOptions, "method"> | string) {
        const updatedOptions = typeof options == "string" ? { url: options } : options;

        return (await this.axios({
            ...updatedOptions,
            method: HttpMethods.GET,
            validateStatus: this.validateStatus,
        })) as AxiosResponse<Type>;
    }

    @error_handler
    public async request<Type>(options: HttpOptions) {
        return (await this.axios({
            ...options,
            validateStatus: this.validateStatus,
        })) as AxiosResponse<Type>;
    }

    @error_handler
    public async post<Type>(options: Omit<HttpOptions, "method">) {
        return (await this.axios({
            ...options,
            method: HttpMethods.POST,
            validateStatus: this.validateStatus,
        })) as AxiosResponse<Type>;
    }
}

function error_handler(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunc = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        try {
            return await originalFunc.apply(this, args);
        } catch (error: any) {
            let err = error;
            if (error.request) {
                err = new Error(`AxiosError: ${error.message}`);
            }
            Error.captureStackTrace(err, descriptor.value);
            throw err;
        }
    };
}
