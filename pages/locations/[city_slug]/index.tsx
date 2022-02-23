import {useState, useRef} from 'react';
import Link from 'next/link';
import { getSession, SessionProviderProps } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'
import Head from "next/head";
import { Prisma } from '@prisma/client';
import { v4 } from "uuid";
import path from "path";
import router from "next/router";
import cx from "classnames";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";

import {EditLocationType, updateLocation, UpdateLocationBodyType} from 'utils/location';
import {getLocation} from 'utilsDb/location';
import {ProductType} from 'utils/product';
import {getAllProductsByLocation} from 'utilsDb/product'
import { formatAmount } from "utils/format";

interface PageInterface {
  location: EditLocationType
}

interface FileInterface {
  file: File;
  fileName: string;
}

interface GeoInterface {
  value: any,
  zones: boolean | string[] // if it's a boolean is because the maps are not correctly structured
}


function ViewLocation({location}: PageInterface) {
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(location.image);
  const [file, setFile] = useState<FileInterface>(null);


  const fileUpload = (e) => {
    e.preventDefault();
  }

  const clearImage = () => {
    imageRef.current.value = null;
    setFile(null);
    setImageSrc(null);
  }

  const submitProduct = async (e) => {
    e.preventDefault();
    router.reload();
  };

  return (
    <>
      <Head>
        <title>View Location</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main className="max-w-6xl mx-auto mt-8 flex-1 pb-8 py-6 ">
          <form
            onSubmit={submitProduct}
            className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6"
          >
            {/* Left */}
            <div className="lg:col-span-2 overflow-hidden space-y-4">
              {/* General Information */}
              <div className="p-4 py-6 sm:p-6 bg-white shadow rounded-md">
                <h3 className="text-lg leading-6 font-medium text-gray-900 border-b border-gray-200 pb-2">
                  General Information
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        disabled
                        readOnly
                        required
                        type="text"
                        name="city"
                        id="city"
                        value={location.city}
                        className="flex-1 hover:cursor-not-allowed focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        disabled
                        readOnly
                        required
                        type="text"
                        name="country"
                        id="country"
                        value={location.country}
                        className="flex-1 hover:cursor-not-allowed focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="cityslug"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City Slug
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        /location/
                      </span>
                      <input
                        disabled
                        readOnly
                        required
                        type="text"
                        name="cityslug"
                        id="cityslug"
                        value={location.city_slug}
                        className="flex-1 hover:cursor-not-allowed focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-none border-r-0 sm:text-sm border-gray-300"
                      />
                      <span className="inline-flex items-center px-3 border border-r-1 border-l-0 border-gray-300 text-gray-500 sm:text-sm rounded-r-md ">
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="countryslug"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country Slug
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        /country/
                      </span>
                      <input
                        disabled
                        readOnly
                        required
                        type="text"
                        name="countryslug"
                        id="countryslug"
                        value={location.country_slug}
                        className="flex-1 hover:cursor-not-allowed focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-none border-r-0 sm:text-sm border-gray-300"
                      />
                      <span className="inline-flex items-center px-3 border border-r-1 border-l-0 border-gray-300 text-gray-500 sm:text-sm rounded-r-md ">
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700">
                      SEO Description
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <textarea
                        required
                        id="seo_description"
                        name="seo_description"
                        className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        rows={8}
                        minLength={50}
                        maxLength={200}
                        defaultValue={location.seo_description}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right */}
            <div className="overflow-hidden space-y-4">

              {/* Image */}
              <div className="p-4 py-6 sm:p-6 bg-white shadow rounded-md">
                <h3 className="text-lg leading-6 font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Image
                </h3>
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Location Image
                </label>
                <p className="text-gray-500 text-sm">
                  Max image size of <span className="font-bold">600KB</span> to
                  improve performance.
                </p>

                {imageSrc && (
                  <div className="w-full h-56 relative mt-1 group">
                    {/* eslint-disable-next-line */}
                    <img
                      className="rounded-md w-full h-full object-contain border-2 border-solid border-gray-300 filter group-hover:brightness-[95%]"
                      src={imageSrc}
                      alt="Location Image"
                    />
                    <a
                      className="absolute top-0 right-0 mt-2 mr-2 hover:cursor-pointer"
                      onClick={clearImage}
                    >
                      <XCircleIcon className="h-7 w-7 text-red-500 group-hover:h-8 group-hover:w-8" />
                    </a>
                  </div>
                )}
                <div
                  className={cx(
                    "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
                    {
                      hidden: imageSrc,
                    }
                  )}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          ref={imageRef}
                          id="file-upload"
                          onChange={fileUpload}
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 300KB
                    </p>
                  </div>
                </div>
              </div>

              {/* Linked Products */}
              {/* <div className="p-4 py-6 sm:p-6 bg-white shadow rounded-md">
                <h3 className="text-lg leading-6 font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Linked Products
                </h3>

                {products.length >= 1 && (
                  <ul
                    role="list"
                    className="border border-gray-200 rounded-md divide-y divide-gray-200 mt-6"
                  >
                    {products.map((product, index) => (
                      <Link                         
                        key={index}
                        href={product.href}>
                      <a>
                      <li
                        className="pl-3 pr-4 py-3 flex flex-col text-sm hover:bg-gray-100 hover:cursor-pointer"
                        // className="pl-3 pr-4 py-3 flex flex-wrap items-center justify-between text-sm hover:bg-gray-100 hover:cursor-pointer"
                      >
                        <div className="ml-1 flex">
                          <p>{product.title}</p>
                        </div>
                        <div className="ml-1 flex">
                          <p className="px-2 capitalize inline-fex text-xs font-semibold rounded-full bg-gray-200 text-gray-800">{product.type}</p>
                        </div>

                      </li>
                      </a>
                      </Link>
                    ))}
                  </ul>
                )}

              </div> */}
            </div>

            {/* Submit */}
            <div className="pt-8 lg:col-span-3">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="disabled:opacity-50 disabled:cursor-not-allowed ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <p>Save</p>
                </button>
              </div>
            </div>
          </form>
        </main>
    </>
  );
}

export async function getServerSideProps({req, res, query, params}: {req: NextApiRequest, res: NextApiResponse, query: any, params: any}) {

  let location : EditLocationType = await getLocation(params.city_slug);
  let products : ProductType[] = await getAllProductsByLocation(Number(location.id));

  return {
    props: {
      location: location,
      products: products
    }
  }
};



export default ViewLocation;
