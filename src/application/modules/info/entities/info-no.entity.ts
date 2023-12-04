import { ApiProperty } from '@nestjs/swagger';

type InfoResultEntityProps = {
  infoNo: string;
  infoStatus: number;
};

export class InfoResultEntity {
  @ApiProperty({
    example: 1,
    description: '信息id',
  })
  infoNo: string;

  @ApiProperty({
    example: 1,
    description: '信息状态',
  })
  infoStatus: number;

  constructor(props: InfoResultEntityProps) {
    this.infoNo = props.infoNo;
    this.infoStatus = props.infoStatus;
  }
}
