"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const user_created_event_1 = require("./events/user-created.event");
let AppService = AppService_1 = class AppService {
    constructor(eventEmitter, schedulerRegistry) {
        this.eventEmitter = eventEmitter;
        this.schedulerRegistry = schedulerRegistry;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    ;
    getHello() {
        return 'Hello World!';
    }
    async createUser(body) {
        this.logger.log('creating user ....', body);
        const userId = '123';
        this.eventEmitter.emit('user.created', new user_created_event_1.UserCreatedEvent(userId, body.email));
        return {
            message: "User created",
            data: body
        };
    }
    welcomeNewUser(payload) {
        this.logger.log('Welcoming in a new user...', payload.email);
    }
    async sendWelcomeGiftToUser(payload) {
        this.logger.log('Granting a gift to new user...', payload.userId);
        await new Promise((resolve) => setTimeout(() => resolve(), 3000));
        this.logger.log('Welcome gift sent..', payload.email);
    }
    deleteExpiredUsers() {
        this.logger.log('Deleting expired users......');
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('user.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_created_event_1.UserCreatedEvent]),
    __metadata("design:returntype", void 0)
], AppService.prototype, "welcomeNewUser", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.created', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_created_event_1.UserCreatedEvent]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "sendWelcomeGiftToUser", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS, { name: 'delete_expired_users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppService.prototype, "deleteExpiredUsers", null);
AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        schedule_1.SchedulerRegistry])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map