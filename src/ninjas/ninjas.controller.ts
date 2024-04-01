import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService) { }

    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        return this.ninjaService.getNinjas(weapon);
    }

    @Get(':id')
    async getOneNinja(@Param('id') id: string) {
        const ninja = await this.ninjaService.getNinja(id);
        if (!ninja) {
            throw new NotFoundException('Ninja not found');
        }
        return ninja;
    }

    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjaService.createNinja(createNinjaDto);
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjaService.updateNinja(id, updateNinjaDto);
    }

    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return this.ninjaService.removeNinja(id);
    }
}
