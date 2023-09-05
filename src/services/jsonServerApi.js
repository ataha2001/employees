import { createApi, fetchBaseQuery,fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const mainURL = 'http://localhost:3000/'

export const jsonServerApi = createApi({ 
    reducerPath: 'jsonServerApi',
    baseQuery: fetchBaseQuery({ baseUrl: mainURL }),
    tagTypes:['Departments', 'Locations' , 'Sections','Benefits'],
    endpoints: (builder) => ({
        getDepartments: builder.query ({
            query: () => `departments`,
            // transformResponse: (response) => response.data,
            // query: async () => {
            //     const response = await fetch('departments');
            //     if (!response.ok) {
            //       throw new Error('Network response was not ok');
            //     }
            //     return response.json();
            //   },
            //   query: (page = 1) => `departments?_page=${page}&_limit=2`,
            providesTags: ['Departments']
        }),
        createDepartment: builder.mutation({
            query: ({id, name, notes, active}) => ({
                url: `departments`,
                method: 'POST',
                body: { id, name, notes, active },
            }),
            invalidatesTags: ['Departments'],
        }),    
        updateDepartment: builder.mutation({
            query: ({ id, name, notes, active }) => ({
                url: `departments/${id}`,
                method: 'PUT',
                body: { id, name, notes, active },
            }),
            invalidatesTags: ['Departments'],
        }),
        
        deleteDepartment: builder.mutation({
            query: ({id}) => ({
                url: `departments/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            invalidatesTags: ['Departments'],
        }),

        getDepartmentById: builder.query({
            query: (id) => `departments/${id}`,
            //   query: (page = 1) => `departments?_page=${page}&_limit=2`,
            providesTags: ['Departments']
        }),
        // Locations API
        getLocations: builder.query ({
            query: () => `locations`,
            // transformErrorResponse: res => res.sort((a,b) => b.id - a.id),
            //   query: (page = 1) => `departments?_page=${page}&_limit=2`,
            providesTags: (result = [], error, arg) => [
                'Locations',
                ...result.map(({ id }) => ({ type: 'Locations', id }))
              ],

        }),
        createLocation: builder.mutation({
            query: ({id, name, address, active}) => ({
                url: `locations`,
                method: 'POST',
                body: { id, name, address, active },
            }),

            invalidatesTags: ['Locations'],
            // async onQueryStarted(args, { queryFulfilled, dispatch}){
            //     try {
            //         const { data: addLocation } = await queryFulfilled
                    
            //         dispatch(
            //             jsonServerApi.util.updateQueryData('getLocations', undefined, (draft)=>{
            //                 draft.push(addLocation)
            //             })
            //         )
            //     } catch (error) {
            //         console.log('Error:', error)
            //     }
            // }
        }),   
        updateLocation: builder.mutation({
            query: ({ id, name, address, active }) => ({
                url: `locations/${id}`,
                method: 'PUT',
                body: { id, name, address, active },
            }),
            invalidatesTags: ['Locations'],
            // async onQueryStarted(args, { queryFulfilled, dispatch}){
            //     try {
            //         const { data: updatedLocation} = await queryFulfilled
            //         console.log('updatedLocation =', updatedLocation)
            //         dispatch(
            //             jsonServerApi.util.updateQueryData('getLocations', undefined, (draft)=>{
            //                 let location = draft?.find((item) => item?.id === args?.id)

            //                 location.name = updatedLocation?.name
            //                 location.address = updatedLocation?.address
            //                 location.active = updatedLocation?.active
            //             })
            //         )
            //     } catch (error) {
            //         console.log('Error:', error)
            //     }
            // }
        }),
        deleteLocation: builder.mutation({
            query: (id) => ({
                url: `locations/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            // invalidatesTags: ['Locations'],
            // invalidatesTags: (result, error, arg) => [{
            //     type: 'Locations', id: arg.id
            // },'Locations'] ,
            async onQueryStarted(args, { queryFulfilled, dispatch}){
                try {
                    await queryFulfilled
                    console.log(args)
                    dispatch(
                        jsonServerApi.util.updateQueryData('getLocations', undefined, (draft)=>{
                            return draft?.filter((location) => location?.id !== args)
                        })
                    )
                } catch (error) {
                    console.log('Error:', error)
                }
            }
            
        }),
         // Sections API
         getSections: builder.query ({
            query: () => `sections/?_expand=departments`,
            providesTags: ['Sections'],
            // queryFn: () => 'departments',
            // providesTags: ['Sections','Departments'],
            // transformResponse:(response)=>{
            //     console.log('response= ',response)
            // },
            // onQueryStartedr[u]
            // async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ){
            //     const result = await fetchWithBQ('sections')
            //     console.log('result= ',result.data)

            //     return result.data
            // }
        }),
        createSection: builder.mutation({
            query: ({id, name, departmentsId, notes, active}) => ({
                url: `sections`,
                method: 'POST',
                body: { id, name, departmentsId, notes, active },
            }),

            invalidatesTags: ['Sections'],
            // async onQueryStarted(args, { queryFulfilled, dispatch}){
            //     try {
            //         const { data: addSection } = await queryFulfilled
                    
            //         dispatch(
            //             jsonServerApi.util.updateQueryData('getSections', undefined, (draft)=>{
            //                 draft.push(addSection)
            //             })
            //         )
            //     } catch (error) {
            //         console.log('Error:', error)
            //     }
            // }
        }),
        updateSection: builder.mutation({
            query: ({ id, name, departmentsId, notes, active }) => ({
                url: `sections/${id}`,
                method: 'PUT',
                body: { id, name, departmentsId, notes, active },
            }),
            invalidatesTags: ['Sections'],
           
        }),
        deleteSection: builder.mutation({
            query: ({id}) => ({
                url: `sections/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            invalidatesTags: ['Sections'],
        }),

        // Jobs API
        getJobs: builder.query ({
            query: () => `jobs`,
            providesTags: ['Jobs'],
            
        }),
        createJob: builder.mutation({
            query: ({id, name, notes, active}) => ({
                url: `jobs`,
                method: 'POST',
                body: { id, name, notes, active },
            }),

            invalidatesTags: ['Jobs'],
        }),
        updateJob: builder.mutation({
            query: ({ id, name, notes, active }) => ({
                url: `jobs/${id}`,
                method: 'PUT',
                body: { id, name, notes, active },
            }),
            invalidatesTags: ['Jobs'],
           
        }),
        deleteJob: builder.mutation({
            query: ({id}) => ({
                url: `Jobs/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            invalidatesTags: ['Jobs'],
        }),
        // Levels API
        getLevels: builder.query ({
            query: () => `levels`,
            providesTags: ['Levels'],
            
        }),
        createlevel: builder.mutation({
            query: ({id, name, notes, active}) => ({
                url: `levels`,
                method: 'POST',
                body: { id, name, notes, active },
            }),

            invalidatesTags: ['Levels'],
        }),
        updatelevel: builder.mutation({
            query: ({ id, name, notes, active }) => ({
                url: `levels/${id}`,
                method: 'PUT',
                body: { id, name, notes, active },
            }),
            invalidatesTags: ['Levels'],
           
        }),
        deletelevel: builder.mutation({
            query: ({id}) => ({
                url: `levels/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            invalidatesTags: ['Levels'],
        }),

        //========================================
        // Benefits API
        getBenefits: builder.query ({
            query: () => `benefits`,
            providesTags: ['Benefits'],
            
        }),
        createBenefit: builder.mutation({
            query: ({id, name, notes, active}) => ({
                url: `benefits`,
                method: 'POST',
                body: { id, name, notes, active },
            }),

            invalidatesTags: ['Benefits'],
        }),
        updateBenefit: builder.mutation({
            query: ({ id, name, notes, active }) => ({
                url: `benefits/${id}`,
                method: 'PUT',
                body: { id, name, notes, active },
            }),
            invalidatesTags: ['Benefits'],
           
        }),
        deleteBenefit: builder.mutation({
            query: ({id}) => ({
                url: `benefits/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            invalidatesTags: ['Benefits'],
        }),
        
        //========================================
        // Deductions API
        getDeductions: builder.query ({
            query: () => `deductions`,
            providesTags: ['Deductions'],
            
        }),
        createDeduction: builder.mutation({
            query: ({id, name, notes, active}) => ({
                url: `deductions`,
                method: 'POST',
                body: { id, name, notes, active },
            }),

            invalidatesTags: ['Deductions'],
        }),
        updateDeduction: builder.mutation({
            query: ({ id, name, address, active }) => ({
                url: `deductions/${id}`,
                method: 'PUT',
                body: { id, name, address, active },
            }),
            invalidatesTags: ['Deductions'],
           
        }),
        deleteDeduction: builder.mutation({
            query: ({id}) => ({
                url: `deductions/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            invalidatesTags: ['Deductions'],
        }),

        //========================================
        // Employee API
        getEmployees: builder.query ({
            query: () => `employees`,
            providesTags: ['Employees'],
            
        }),
        createEmployee: builder.mutation({
            query: ({id, empName, email, phone, gender, bdate, address, file, 
                departmentsId, sectionsId, levelsId, jobsId, locationsId, insuranceNo,
                active, bsalary, benefits, deductions,
                }) => ({
                url: `employees`,
                method: 'POST',
                body: { id, empName, email, phone, gender, bdate, address, file, 
                    departmentsId, sectionsId, levelsId, jobsId, locationsId, insuranceNo,
                    active, bsalary, benefits, deductions, },
            }),

            invalidatesTags: ['Employees'],
        }),


    }),
});

export const { useGetDepartmentsQuery,  
            useCreateDepartmentMutation, 
            useUpdateDepartmentMutation,
            useDeleteDepartmentMutation,
            useGetDepartmentByIdQuery,

            useGetLocationsQuery, 
            useCreateLocationMutation, 
            useUpdateLocationMutation,
            useDeleteLocationMutation,

            useGetSectionsQuery,
            useCreateSectionMutation,
            useUpdateSectionMutation,
            useDeleteSectionMutation,

            useGetJobsQuery,
            useCreateJobMutation,
            useUpdateJobMutation,
            useDeleteJobMutation,

            useGetLevelsQuery,
            useCreateLevelMutation,
            useUpdateLevelMutation,
            useDeleteLevelMutation,
            
            useGetBenefitsQuery,
            useCreateBenefitMutation,
            useUpdateBenefitMutation,
            useDeleteBenefitMutation,

            useGetDeductionsQuery,
            useCreateDeductionMutation,
            useUpdateDeductionMutation,
            useDeleteDeductionMutation,
            
            useCreateEmployeeMutation,

        } = jsonServerApi;
