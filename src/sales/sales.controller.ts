import { Get, Query, HttpCode, Controller } from '@nestjs/common';

import { SalesService } from './sales.service';

@Controller('api/v1/sales-performance')
class SalesController {
  constructor(private salesService: SalesService) {}

  @Get('/get-sales-by-timeline-or-time-period')
  @HttpCode(200)
  getSalesByTimeline(
    @Query()
    query: {
      page: string;
      timeline: string;
      endDay?: string;
      startDay?: string;
    },
  ) {
    const { page, timeline, endDay, startDay } = query;

    console.log(timeline, endDay, startDay);

    return this.salesService.getSalesByTimelineOrTimePeriod(
      parseInt(page),
      parseInt(timeline),
      endDay,
      startDay,
    );
  }
}

export { SalesController };
