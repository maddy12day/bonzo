
import pathlib
import sys
import os
import numpy as np
import pandas as pd
import json
from datetime import datetime
from common import (
    mysql_db_conn_init,
    mysql_read_operation,
    cache_connection,
)
from queries import (
    # All filters
    allRegularFiltersQuery,
    allProgramsFiltersQuery
)


def createRegularFilterJsonGroup(df, cacheConnection):
    try:
        regularFilterJsonByPsource = pd.DataFrame()
        regularFilterJsonByBType = pd.DataFrame()
        regularFilterJsonByLC = pd.DataFrame()
        regularFilterJsonByNNess = pd.DataFrame()
        regularFilterJsonByBrand = pd.DataFrame()
        regularFilterJsonByChannel = pd.DataFrame()
        regularFilterJsonBySubChannel = pd.DataFrame()
        regularFilterJsonByCategories = pd.DataFrame()
        regularFilterJsonByCollections = pd.DataFrame()

        regularFilterJsonByPsource["brand_type"] = df.groupby(
            ['product_source'])['brand_type'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["brand"] = df.groupby(
            ['product_source'])['brand'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["life_cycle"] = df.groupby(
            ['product_source'])['life_cycle'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["newness"] = df.groupby(
            ['product_source'])['newness'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["channel"] = df.groupby(
            ['product_source'])['channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["sub_channel"] = df.groupby(
            ['product_source'])['sub_channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["category"] = df.groupby(
            ['product_source'])['category'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["collection"] = df.groupby(
            ['product_source'])['collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByPsource["sku"] = df.groupby(
            ['product_source'])['sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonByBType["life_cycle"] = df.groupby(['product_source', 'brand_type'])[
            'life_cycle'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBType["brand"] = df.groupby(['product_source', 'brand_type'])[
            'brand'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBType["newness"] = df.groupby(['product_source', 'brand_type'])[
            'newness'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBType["channel"] = df.groupby(['product_source', 'brand_type'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBType["sub_channel"] = df.groupby(['product_source', 'brand_type'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBType["category"] = df.groupby(['product_source', 'brand_type'])[
            'category'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBType["collection"] = df.groupby(['product_source', 'brand_type'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBType["sku"] = df.groupby(['product_source', 'brand_type'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonByLC["brand"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'brand'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByLC["newness"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'newness'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByLC["channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByLC["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByLC["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'category'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByLC["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByLC["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonByNNess["brand"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'brand'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByNNess["channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByNNess["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByNNess["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'category'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByNNess["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByNNess["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonByBrand["channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBrand["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBrand["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'category'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBrand["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByBrand["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonByChannel["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByChannel["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel'])[
            'category'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByChannel["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByChannel["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonBySubChannel["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel', 'sub_channel'])[
            'category'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonBySubChannel["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel', 'sub_channel'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonBySubChannel["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel', 'sub_channel'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonByCategories["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel', 'sub_channel', 'category'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        regularFilterJsonByCategories["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'channel', 'sub_channel', 'category'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        regularFilterJsonByCollections["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness',
                                                           'brand', 'channel', 'sub_channel', 'category', 'collection'])['sku'].apply(lambda x: list(np.unique(x)))

        cacheConnection.set(
            "productSource", regularFilterJsonByPsource.to_json())
        cacheConnection.set("brandType", regularFilterJsonByBType.to_json())
        cacheConnection.set("lifeCycle", regularFilterJsonByLC.to_json())
        cacheConnection.set("newness", regularFilterJsonByNNess.to_json())
        cacheConnection.set("brands", regularFilterJsonByBrand.to_json())
        cacheConnection.set("channels", regularFilterJsonByChannel.to_json())
        cacheConnection.set(
            "subChannels", regularFilterJsonBySubChannel.to_json())
        cacheConnection.set(
            "categories", regularFilterJsonByCategories.to_json())
        cacheConnection.set(
            "collections", regularFilterJsonByCollections.to_json())

    except Exception as e:
        sys.exc_info()


def createProgramFilterSJsonGroup(df, cacheConnection):
    try:
        programFilterJsonByPsource = pd.DataFrame()
        programFilterJsonByBType = pd.DataFrame()
        programFilterJsonByLC = pd.DataFrame()
        programFilterJsonByNNess = pd.DataFrame()
        programFilterJsonByBrand = pd.DataFrame()
        programFilterJsonByCollab = pd.DataFrame()
        programFilterJsonByChannel = pd.DataFrame()
        programFilterJsonBySubChannel = pd.DataFrame()
        programFilterJsonByCategories = pd.DataFrame()
        programFilterJsonByClasses = pd.DataFrame()
        programFilterJsonBySubClases = pd.DataFrame()
        programFilterJsonByCollections = pd.DataFrame()

        programFilterJsonByPsource["brand_type"] = df.groupby(
            ['product_source'])['brand_type'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["life_cycle"] = df.groupby(
            ['product_source'])['life_cycle'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["newness"] = df.groupby(
            ['product_source'])['newness'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["brand"] = df.groupby(
            ['product_source'])['brand'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["collab"] = df.groupby(
            ['product_source'])['collab'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["channel"] = df.groupby(
            ['product_source'])['channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["sub_channel"] = df.groupby(
            ['product_source'])['sub_channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["category"] = df.groupby(
            ['product_source'])['category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["class"] = df.groupby(
            ['product_source'])['class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["sub_class"] = df.groupby(
            ['product_source'])['sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["collection"] = df.groupby(
            ['product_source'])['collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByPsource["sku"] = df.groupby(
            ['product_source'])['sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByBType["life_cycle"] = df.groupby(['product_source', 'brand_type'])[
            'life_cycle'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["newness"] = df.groupby(['product_source', 'brand_type'])[
            'newness'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["brand"] = df.groupby(['product_source', 'brand_type'])[
            'brand'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["collab"] = df.groupby(['product_source', 'brand_type'])[
            'collab'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["channel"] = df.groupby(['product_source', 'brand_type'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["sub_channel"] = df.groupby(['product_source', 'brand_type'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["category"] = df.groupby(['product_source', 'brand_type'])[
            'category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["class"] = df.groupby(['product_source', 'brand_type'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["sub_class"] = df.groupby(['product_source', 'brand_type'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["collection"] = df.groupby(['product_source', 'brand_type'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBType["sku"] = df.groupby(['product_source', 'brand_type'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByLC["newness"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'newness'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["brand"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'brand'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["collab"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'collab'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["class"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByLC["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByNNess["brand"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'brand'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["collab"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'collab'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByNNess["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByBrand["collab"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'collab'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBrand["channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBrand["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBrand["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBrand["class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBrand["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBrand["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByBrand["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByCollab["channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCollab["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCollab["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCollab["class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCollab["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCollab["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCollab["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCollab["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByChannel["sub_channel"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel'])[
            'sub_channel'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByChannel["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel'])[
            'category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByChannel["class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByChannel["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByChannel["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByChannel["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonBySubChannel["category"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel'])[
            'category'].apply(lambda x: list(np.unique(x)))
        programFilterJsonBySubChannel["class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonBySubChannel["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonBySubChannel["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonBySubChannel["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByCategories["class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel', 'category'])[
            'class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCategories["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel', 'category'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCategories["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel', 'category'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByCategories["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel', 'category'])[
            'sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByClasses["sub_class"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel', 'category', 'class'])[
            'sub_class'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByClasses["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab', 'channel', 'sub_channel', 'category', 'class'])[
            'collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonByClasses["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand',
                                                       'collab', 'channel', 'sub_channel', 'category', 'class'])['sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonBySubClases["collection"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand',
                                                                'collab', 'channel', 'sub_channel', 'category', 'class', 'sub_class'])['collection'].apply(lambda x: list(np.unique(x)))
        programFilterJsonBySubClases["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand',
                                                         'collab', 'channel', 'sub_channel', 'category', 'class', 'sub_class'])['sku'].apply(lambda x: list(np.unique(x)))

        programFilterJsonByCollections["sku"] = df.groupby(['product_source', 'brand_type', 'life_cycle', 'newness', 'brand', 'collab',
                                                           'channel', 'sub_channel', 'category', 'class', 'sub_class', 'collection'])['sku'].apply(lambda x: list(np.unique(x)))

        cacheConnection.set(
            "programSource", programFilterJsonByPsource.to_json())
        cacheConnection.set("programType", programFilterJsonByBType.to_json())
        cacheConnection.set("programLifeCycle",
                            programFilterJsonByLC.to_json())
        cacheConnection.set(
            "programNewness", programFilterJsonByNNess.to_json())
        cacheConnection.set(
            "programbrands", programFilterJsonByBrand.to_json())
        cacheConnection.set(
            "programCollabs", programFilterJsonByCollab.to_json())
        cacheConnection.set("programChannels",
                            programFilterJsonByChannel.to_json())
        cacheConnection.set("programSubChannels",
                            programFilterJsonBySubChannel.to_json())
        cacheConnection.set("programCategories",
                            programFilterJsonByCategories.to_json())
        cacheConnection.set(
            "programClasses", programFilterJsonByClasses.to_json())
        cacheConnection.set("programSubClasses",
                            programFilterJsonBySubClases.to_json())
        cacheConnection.set("programCollections",
                            programFilterJsonByCollections.to_json())

    except Exception as e:
        sys.exc_info()
    pass


def allRegularFilterCacheSetter(df, cacheKey, cacheConnection):
    try:
        jsonDf = {
            "product_source": list(set(df['product_source'].values)),
            "brand_type": list(set(df['brand_type'].values)),
            "life_cycle": list(set(df['life_cycle'].values)),
            "newness": list(set(df['newness'].values)),
            "channel": list(set(df['channel'].values)),
            "brand": list(set(df['brand'].values)),
            "sub_channel": list(set(df['sub_channel'].values)),
            "category": list(set(df['category'].values)),
            "collection": list(set(df['collection'].values)),
            "sku": list(set(df['sku'].values))
        }
        data = json.dumps(jsonDf)
        cacheConnection.set(cacheKey, data)
    except Exception as e:
        sys.exc_info()


def allProgramFilterCacheSetter(df, cacheKey, cacheConnection):
    try:
        jsonDf = {
            "product_source": list(set(df['product_source'].values)),
            "brand_type": list(set(df['brand_type'].values)),
            "life_cycle": list(set(df['life_cycle'].values)),
            "newness": list(set(df['newness'].values)),
            "brand": list(set(df['brand'].values)),
            "collab": list(set(df['collab'].values)),
            "channel": list(set(df['channel'].values)),
            "sub_channel": list(set(df['sub_channel'].values)),
            "category": list(set(df['category'].values)),
            "class": list(set(df['class'].values)),
            "sub_class": list(set(df['sub_class'].values)),
            "collection": list(set(df['collection'].values)),
            "sku": list(set(df['sku'].values))
        }
        data = json.dumps(jsonDf)
        cacheConnection.set(cacheKey, data)
    except Exception as e:
        sys.exc_info()


def main():
    try:
        cacheConnection = cache_connection()
        MySQLConn = mysql_db_conn_init()

        allRegularFiltersDf = mysql_read_operation(
            allRegularFiltersQuery, MySQLConn)
        allRegularFilterCacheSetter(
            allRegularFiltersDf, "allRegularFilters", cacheConnection)
        createRegularFilterJsonGroup(allRegularFiltersDf, cacheConnection)

        # ======= all program filters cache setter
        allProgramsFiltersDf = mysql_read_operation(
            allProgramsFiltersQuery, MySQLConn)
        allProgramFilterCacheSetter(
            allProgramsFiltersDf, "allProgramFilters", cacheConnection)
        createProgramFilterSJsonGroup(allProgramsFiltersDf, cacheConnection)

        cacheConnection.close()

    except Exception as e:
        print(e)


if (__name__ == "__main__"):
    processing_file = pathlib.Path('/tmp/load-filter-options.pid')
    if processing_file.exists():
        print("Bonzo load-filter-options process is already running")
    else:
        open(processing_file, 'w')
        main()
        os.remove(processing_file)
        print("Bonzo load-filter-options process end successfully..........")
