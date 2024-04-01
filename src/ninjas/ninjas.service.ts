import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { Ninja } from './interface/ninja.interface';

@Injectable()
export class NinjasService {
  constructor(@InjectModel('Ninja') private readonly ninjaModel: Model<Ninja>) {}

  async getNinjas(weapon?: 'stars' | 'nunchucks'): Promise<Ninja[]> {
    if (weapon) {
      return this.ninjaModel.find({ weapon }).exec();
    }
    return this.ninjaModel.find().exec();
  }

  async getNinja(id: string): Promise<Ninja> {
    const ninja = await this.ninjaModel.findById(id).exec();
    if (!ninja) {
      throw new NotFoundException('Ninja not found');
    }
    return ninja;
  }

  async createNinja(createNinjaDto: CreateNinjaDto): Promise<Ninja> {
    const createdNinja = new this.ninjaModel(createNinjaDto);
    return createdNinja.save();
  }

  async updateNinja(id: string, updateNinjaDto: UpdateNinjaDto): Promise<Ninja> {
    const updatedNinja = await this.ninjaModel.findByIdAndUpdate(id, updateNinjaDto, { new: true }).exec();
    if (!updatedNinja) {
      throw new NotFoundException('Ninja not found');
    }
    return updatedNinja;
  }

  async removeNinja(id: string): Promise<Ninja> {
    const removedNinja = await this.ninjaModel.findOneAndDelete({ _id: id }).exec();
    if (!removedNinja) {
      throw new NotFoundException('Ninja not found');
    }
    return removedNinja;
  }
  
}

