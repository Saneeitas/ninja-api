import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {CreateNinjaDto} from "./dto/create-ninja.dto"
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService){}
    // get ninjas
    @Get()
    getNinjas(@Query('weapon') weapon: 'starts' | 'nunchucks'){
       
        return this.ninjaService.getNinjas(weapon);
    }

    // get one ninja
    @Get(':id')
    getOneNinja(@Param('id') id:String){
        return {
            id
        }
    }

    // create ninja
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
        return {
            name: createNinjaDto.name
        }
    }

    // update ninja
    @Put(':id')
    updateNinja(@Param('id') id:String, @Body() updateNinjaDto: UpdateNinjaDto){
        return {
            id,
            name: updateNinjaDto
        }
    }

    // delete ninja
    @Delete(':id')
    removeNinja(@Param('id') id:String){
        return {
            id
        }
    }
}
