import { Controller ,Get} from '@nestjs/common';
import { SalesService } from './sales.service';
import { log } from 'console';

@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) { }
    @Get('dashboard')
    async getDashboard() {
        log('Fetching dashboard data...');
        return await this.salesService.getDashboard();
    }
}
