import { IUser } from '@app/common/Auth/DTO/IUser.interface';
import { IResponse } from '@app/common/IResponse';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponse implements IResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'activated success' })
  message: string;

  @ApiProperty({
    example: {
      user: {
        id: '123',
        email: 'xxx.@gmail.com',
        username: 'xxx',
      },
      token: {
        accessToken:
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmhodW5nMzEzIiwiaWF0IjoxNjg0MTU1OTE4LCJleHAiOjE2ODQxNTc3MTh9.SkZkpBkn4J0ADZpCrlMC8Hpnt9JQCEOFV5ZDJWAftECQ3opH3FxPlAETJ0hCq0fTc2O4lkaFAbRVJPKeIYjF1uGDo_HmNLe49JZQswhGraWgOvaIy3tGyrq_utOep2FLmIqlO_nXpcI_n_4zEBblrTi-N26nhZlZOCIK1-v1zbC8oKCpO9PWaM7IiW6Kq6rPleg-663omov6qiUudF86jqWJ8v1sWGiCYfHVsJNqKlh16sgQh_G8-tqAdi04Tgi_6-CTMup-_894g7yPUlFNfeLGvlY4ZQIo2n0gHBh6c_zI7iWLgEW9MH62_42d0yzPC7dpQQow4AZN1iP1p6Mthuhbi0C6D6TFSrkgarFFPlb3mHW74qPnuyVLcN3TZVC0I4-Le3BeOJZwFksfoFH6_LoZTPSbJnmzMWhuvwMXxuqnSbR_EbXUZ1AY7jF_925oieZj7O5_YR6JxKAXd0bVwOyf4TFL0aEfRVN-uQfDEAJ4HOS9wB4L1rMQRufo6HBKEdHmluEn1x_tZaJ3Bw36B_oFEPe_JkkiFTTAGLggzpYIf2ym0jG7lHU6cbZKFgccx4tKUjXcE_tkl-pNbXNpug1ZszZxtiyP5oSm7LzYYjOAlTF1O3sCM9nVtsv5tjBUStGp0oQHGLDgX2lB8FjQhNHvNvwh-fd610QVrdOU0ng',
        refreshToken:
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmhodW5nMzEzIiwiaWF0IjoxNjg0MTU1OTE4LCJleHAiOjE2ODQxNTc3MTh9.SkZkpBkn4J0ADZpCrlMC8Hpnt9JQCEOFV5ZDJWAftECQ3opH3FxPlAETJ0hCq0fTc2O4lkaFAbRVJPKeIYjF1uGDo_HmNLe49JZQswhGraWgOvaIy3tGyrq_utOep2FLmIqlO_nXpcI_n_4zEBblrTi-N26nhZlZOCIK1-v1zbC8oKCpO9PWaM7IiW6Kq6rPleg-663omov6qiUudF86jqWJ8v1sWGiCYfHVsJNqKlh16sgQh_G8-tqAdi04Tgi_6-CTMup-_894g7yPUlFNfeLGvlY4ZQIo2n0gHBh6c_zI7iWLgEW9MH62_42d0yzPC7dpQQow4AZN1iP1p6Mthuhbi0C6D6TFSrkgarFFPlb3mHW74qPnuyVLcN3TZVC0I4-Le3BeOJZwFksfoFH6_LoZTPSbJnmzMWhuvwMXxuqnSbR_EbXUZ1AY7jF_925oieZj7O5_YR6JxKAXd0bVwOyf4TFL0aEfRVN-uQfDEAJ4HOS9wB4L1rMQRufo6HBKEdHmluEn1x_tZaJ3Bw36B_oFEPe_JkkiFTTAGLggzpYIf2ym0jG7lHU6cbZKFgccx4tKUjXcE_tkl-pNbXNpug1ZszZxtiyP5oSm7LzYYjOAlTF1O3sCM9nVtsv5tjBUStGp0oQHGLDgX2lB8FjQhNHvNvwh-fd610QVrdOU0ng',
      },
    },
    nullable: true,
  })
  data: {
    user: IUser;
    token: object;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: {
    [key: string]: any;
  };
}
