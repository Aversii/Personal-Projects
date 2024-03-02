import { UserController } from "../../../controller/userController";
import { Request, Response } from 'express';
import { SignupInputDTO, LoginUserInputDTO } from '../../../model/user';

jest.mock('../../business/userBusiness', () => {
    return {
        UserBusiness: jest.fn().mockImplementation(() => ({
            createUser: jest.fn().mockResolvedValue('mocked-token'),
            login: jest.fn().mockResolvedValue('mocked-token'),
            getAllUsers: jest.fn().mockResolvedValue([{ id: '1', name: 'Test User' }]),
            getUserById: jest.fn().mockResolvedValue({ id: '1', name: 'Test User' }),
            changePassword: jest.fn().mockResolvedValue(true),
            followUser: jest.fn().mockResolvedValue(true),
            unfollowUser: jest.fn().mockResolvedValue(true),
            getAllFollows: jest.fn().mockResolvedValue([{ id: '1', name: 'Followed User' }]),
            getFeed: jest.fn().mockResolvedValue([{ id: '1', name: 'Feed Item' }]),
        })),
    };
});

describe('UserController', () => {
    let userController: UserController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        userController = new UserController();
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;
    });

    it('should signup a new user', async () => {
        req.body = { email: 'test@example.com', name: 'Test User', password: 'password', role: 'user' } as SignupInputDTO;
        await userController.signup(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ message: 'Usuário cadastrado com sucesso', token: 'mocked-token' });
    });

    it('should login a user', async () => {
        req.body = { email: 'test@example.com', password: 'password' } as LoginUserInputDTO;
        await userController.login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'login efetuado!', token: 'mocked-token' });
    });

    it('should get all users', async () => {
        req.headers = { authorization: 'token' };
        await userController.getAllUsers(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ id: '1', name: 'Test User' }]);
    });

    it('should get user by id', async () => {
        req.headers = { authorization: 'token' };
        req.params = { id: '1' };
        await userController.getUserById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ id: '1', name: 'Test User' });
    });

    it('should change user password', async () => {
        req.headers = { authorization: 'token' };
        req.body = { newPassword: 'newPassword', oldPassword: 'oldPassword' };
        await userController.changePassword(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'senha modificada com sucesso' });
    });

    it('should follow a user', async () => {
        req.headers = { authorization: 'token' };
        req.params = { followedId: '2' };
        await userController.followUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'User Has Been Followed' });
    });

    it('should unfollow a user', async () => {
        req.headers = { authorization: 'token' };
        req.params = { unfollowedId: '2' };
        await userController.unfollowUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'User Has Been Unfollowed' });
    });

    it('should get all follows', async () => {
        req.headers = { authorization: 'token' };
        await userController.getAllFollows(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ id: '1', name: 'Followed User' }]);
    });

    it('should get user feed', async () => {
        req.headers = { authorization: 'token' };
        await userController.getFeed(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ id: '1', name: 'Feed Item' }]);
    });
});
