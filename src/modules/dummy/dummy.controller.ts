import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DummyService } from './dummy.service';

@Controller('v1/dummies')
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}

  @ApiOperation({
    description: 'Get all dummies',
  })
  @ApiOkResponse({
    description: 'Success!',
    status: 200,
    type: String,
    isArray: true,
  })
  @Get()
  @HttpCode(200)
  findAll(): string[] {
    return ['foo', 'bar', 'baz'];
  }

  @ApiOperation({
    description: 'Get an existing dummy by id',
  })
  @ApiOkResponse({
    description: 'Success!',
    status: 200,
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials provided.',
  })
  @Get(':dummyUuidString')
  @HttpCode(200)
  findbyUuid(@Param('dummyUuidString') dummyUuidString: string): string {
    return `Some dummy with uuid string: ${dummyUuidString}`;
  }

  @ApiOperation({
    description: 'Create a dummy',
  })
  @ApiOkResponse({
    description: 'Success!',
    status: 200,
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials provided.',
  })
  @Post()
  @HttpCode(200)
  create(@Body() body: string): string {
    return `Create some dummy with attributes ${body}`;
  }

  @Get('/boom')
  @ApiOperation({
    description: 'Example dummy error',
  })
  @ApiInternalServerErrorResponse({ description: 'It go boom' })
  boom(): Promise<void> {
    return this.dummyService.boom();
  }
}
