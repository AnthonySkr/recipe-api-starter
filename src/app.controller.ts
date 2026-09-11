import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';

@ApiTags('Health')
@Controller()
export class AppController {
  @ApiOperation({ summary: "Vérifier que l'API répond (route publique)" })
  @ApiResponse({ status: 200, description: 'API opérationnelle' })
  @Public()
  @Get()
  healthCheck(): { status: string } {
    return { status: 'ok' };
  }
}
