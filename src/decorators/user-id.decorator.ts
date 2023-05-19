import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { authorizationToLoginPayload } from "../utils/base-64-converter";


export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
        const { authorization } = ctx.switchToHttp().getRequest().headers;
        const loginPayload = authorizationToLoginPayload(authorization);
        // loginPayload can be undefined, so we use the optional chaining operator
        // if it is undefined, it will return undefined, if not, it will return the id
        return loginPayload?.id;
    },
);