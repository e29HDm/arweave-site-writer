import ArLocal from "arlocal";

export

class ArLocalServer {
    private server: ArLocal;

    constructor() {
        this.server = new ArLocal(1820, false, undefined, false);
    }

    async start() {
        await this.server.start();
    }

    async stop() {
        await this.server.stop();
    }

}