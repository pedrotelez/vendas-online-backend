import { Controller, Get, Inject, Param } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(
        private readonly cityService: CityService,
    ) {}

    @Get('/:stateId') // this notation is used to get the stateId from the URL
    async getAllCitiesByStateId(@Param('stateId') stateId: number): Promise<CityEntity[]> {
        console.log(`Fetching all cities by stateId, for stateId: ${stateId}`);
        return this.cityService.getAllCitiesByStateId(stateId);
    }
}
