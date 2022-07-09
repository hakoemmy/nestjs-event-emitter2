import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CreateUserRequest } from './dto/create-user.request';
import { UserCreatedEvent } from './events/user-created.event';

@Injectable()
export class AppService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly schedulerRegistry: SchedulerRegistry
  ){};
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(body: CreateUserRequest){
   this.logger.log('creating user ....', body);
   const userId = '123';
   this.eventEmitter.emit('user.created', new UserCreatedEvent(userId, body.email));
   
   return {
     message: "User created",
     data: body
   };
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: UserCreatedEvent){
    this.logger.log('Welcoming in a new user...',payload.email);
  }

  @OnEvent('user.created', { async: true })
  async sendWelcomeGiftToUser(payload: UserCreatedEvent){
    this.logger.log('Granting a gift to new user...',payload.userId);
    await new Promise<void> ((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log('Welcome gift sent..', payload.email);
  }

  @Cron(CronExpression.EVERY_10_SECONDS, {name: 'delete_expired_users'})
  deleteExpiredUsers(){
    this.logger.log('Deleting expired users......')
  }
}
