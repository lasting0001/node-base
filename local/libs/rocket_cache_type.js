/**
 * Created by Jun.li on 2015/8/12.
 */
"use strict";

function RocketCacheType() {
    return {
        USER_INFO_BY_ID: {
            sql: 'SELECT IFNULL(nickname,username)AS user_name FROM wumiao_user WHERE id = ?;',
            dbPoolName: '5miao_game_master',
            type: 'gcs_user_info_by_id'
        },
        GAME_INFO_BY_ID: {
            sql: 'SELECT IFNULL(cn_name,en_name)AS game_name FROM wumiao_game WHERE id = ?;',
            dbPoolName: '5miao_game_master',
            type: 'gcs_game_info_by_id'
        },
        GAME_EXTRA_INFO_BY_ID: {
            sql: 'SELECT logo_img AS game_pic FROM wumiao_game_extra WHERE game_id = ?;',
            dbPoolName: '5miao_game_master',
            type: 'gcs_game_extra_info_by_id'
        },
        PARTNER_INFO_BY_NAME: {
            sql: 'SELECT id,is_private FROM wumiao_partner WHERE partner_name = ?;',
            dbPoolName: '5miao_game_master',
            type: 'gcs_partner_info_by_name'
        },
        CHANNEL_INFO_BY_NAME: {
            sql: 'SELECT id FROM wumiao_channel WHERE partner_id = ? AND channel_name = ?;',
            dbPoolName: '5miao_game_master',
            type: 'gcs_channel_info_by_name'
        },
        CHANNEL_GAME_INFO_BY_NAME: {
            sql: 'SELECT cn_name AS game_name,logo_img AS game_pic FROM wumiao_channel_game WHERE channel_key = ? AND game_id = ?;',
            dbPoolName: '5miao_game_master',
            type: 'gcs_channel_game_info_by_name'
        }
    }
}

global.ROCKET_CACHE_TYPE = RocketCacheType();


//_RocketPieceCache.getPiece(ROCKET_CACHE_TYPE.CHANNEL_INFO_BY_NAME, [28, ''], function (result) {
//    console.log(result);
//});