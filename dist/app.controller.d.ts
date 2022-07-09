import { AppService } from './app.service';
import { CreateUserRequest } from './dto/create-user.request';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    createUser(body: CreateUserRequest): Promise<{
        message: string;
        data: CreateUserRequest;
    }>;
}
