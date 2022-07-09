import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CreateUserRequest } from './dto/create-user.request';
import { UserCreatedEvent } from './events/user-created.event';
export declare class AppService {
    private readonly eventEmitter;
    private readonly schedulerRegistry;
    constructor(eventEmitter: EventEmitter2, schedulerRegistry: SchedulerRegistry);
    private readonly logger;
    getHello(): string;
    createUser(body: CreateUserRequest): Promise<{
        message: string;
        data: CreateUserRequest;
    }>;
    welcomeNewUser(payload: UserCreatedEvent): void;
    sendWelcomeGiftToUser(payload: UserCreatedEvent): Promise<void>;
    deleteExpiredUsers(): void;
}
