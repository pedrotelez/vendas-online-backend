import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ) { }

    async createAddress(
        createAddressDto: CreateAddressDto,
        userId: number
    ): Promise<AddressEntity> {

        await this.userService.findUserById(userId);
        await this.cityService.findCityById(createAddressDto.cityId);

        return this.addressRepository.save({
            ...createAddressDto,
            userId,
        });
    }

    async findAddressByUserId(userId: number): Promise<AddressEntity[]> {
        const addresses = await this.addressRepository.find({
            where: {
                userId,
            },
        });

        if (!addresses) {
            throw new NotFoundException(`Addresses not found for user ${userId}`);
        }

        return addresses;
    }
}
