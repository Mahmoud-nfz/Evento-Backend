import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}

	handleRequest(err, user, info, context) {
		const response = context.switchToHttp().getResponse();
		if (err || !user) {
			// handle unauthorized access
		} else {
			// response.setHeader('Authorization', `Bearer ${user.access_token}`);
		}
		return user;
	}
}
