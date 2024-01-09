import { connect } from "@planetscale/database";
import { PlanetScaleDatabase, drizzle } from "drizzle-orm/planetscale-serverless";
import { PLANET_SCALE_CONFIG } from "../../planetscale.configuration";
import * as schema from './schemas/index';

export const Connect = (): PlanetScaleDatabase<typeof schema> => {
    const connection = connect(PLANET_SCALE_CONFIG);
    return drizzle(connection, {
        logger: true,
        schema: schema
    })
}

