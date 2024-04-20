import { TokenController } from "./controller/TokenController"

export const Routes = [{
    method: "get",
    route: "/tokens",
    controller: TokenController,
    action: "all"
}, {
    method: "get",
    route: "/tokens/:tokenId",
    controller: TokenController,
    action: "one"
}, {
    method: "post",
    route: "/tokens",
    controller: TokenController,
    action: "save"
}, {
    method: "delete",
    route: "/tokens/:tokenId",
    controller: TokenController,
    action: "remove"
}]