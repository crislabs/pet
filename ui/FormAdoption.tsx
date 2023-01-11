'use client'
import { petCreateAdoption } from "@/lib/product/adoptions/createAdoption";
import { useUI } from "@/src/providers/UIContext";
import { CreateProduct, Product } from "@/src/interfaces/product";
import { getQuery, SwalMessage, SwalMessageSiteCreateError } from "@/src/utils";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form'

interface Error {
  response: { errors: [{ message: string }] };
}

interface Props {
  adoption?: Product
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}


export function FormAdoption(props: Props) {
  const { adoption } = props
  const { data: session } = useSession()
  const searchParams = useSearchParams();

  // console.log('data', session)
  const query = getQuery()
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  const { mutate: createPetAdoption, isLoading, isError, error } = useMutation({
    mutationFn: async (input: CreateProduct) =>
      await petCreateAdoption(input),
    
    onSuccess: async (data) => {
      queryClient.setQueryData<Product[]>(['pet-get-adoptions', data.parentId], (old) => [...old as Product[], data])
      
      await SwalMessage('Adoption Created ');
      toggle();
    },
    onError:  (err: Error) => {
      SwalMessageSiteCreateError(err.response.errors[0].message);

    },
  });
  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: adoption
      ? {
        name: adoption?.dataProduct.seoProduct.title,
        description: adoption?.dataProduct.seoProduct.description,
        type: searchParams.get('type') as string,
      }
      : { name: '', description: 'adoption description', type: searchParams.get('type') as string },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const form = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
      siteId: process.env.NEXT_PUBLIC_SITE_URL as string,
      uid: session?.token.sid as string,
    };
    // createPetPage0({ ...form, parentId: process.env.NEXT_PUBLIC_SITE_URL as string })
    // console.log('form', {...form, parentId: query[3]})
    createPetAdoption({...form, parentId: query[3]})
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
        <div className="flex items-start justify-between">
          <Dialog.Title className="text-lg font-medium text-gray-900">New Adoption</Dialog.Title>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={setLeft}
            >
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <div>
              <div className="sm:rounded-md">
                <div className="bg-white">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="label-form">Name</label>
                      <input
                        type="text"
                        autoComplete="off"
                        className="input-form"
                        {...register('name', {
                          required: 'Title required!!',
                          minLength: { value: 2, message: 'min 2 characters' },
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm">This is required!!</p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label className="label-form">Description</label>
                      <div className="mt-1">
                        <textarea
                          rows={6}
                          className="input-form"
                          {...register('description', {
                            required: 'Title required!!',
                            minLength: { value: 2, message: 'min 2 characters' },
                          })}
                        />
                        {errors.description && (
                          <p className="text-red-600 text-sm">This is required!!</p>
                        )}
                      </div>
                    </div>

                    {/* <div className="col-span-6 mb-5">
                      <h2 className="contents text-sm font-medium text-gray-700">
                        Type{' '}
                      </h2>
                      <div className="grid grid-cols-2">

                        <>
                          {
                            // query[2] === 'wear' &&
                            //   query.length === 6 &&
                            typePagePet.map((data) => (
                              <div
                                className="flex items-center my-2"
                                key={data.label}
                              >
                                <input
                                  type="radio"
                                  id={data.value}
                                  value={data.value}
                                  {...register('type', { required: true })}
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={({ target }) =>
                                    setValue('type', target.value, {
                                      shouldValidate: true,
                                    })
                                  }
                                />
                                <label className="ml-3 label-form">
                                  {data.label}
                                </label>
                              </div>
                            ))}
                        </>


                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className=" border-t border-gray-200 p-3 bg-gray-200">
        <div className="group-button-form ">
          <button type="submit" className="btn-primary ">
            {
              isLoading ? '...Saving' : 'Save'
            }
          </button>
          <button
            type="button"
            className="btn-default"
            onClick={setLeft}
          // ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>

      </div>

    </form>
  );
}