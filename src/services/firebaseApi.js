import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../configs/firebase.config";
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";



export const firebaseApi = createApi({ 
    reducerPath: 'firebaseApi',
    baseQuery: fakeBaseQuery(),
    immer: false,
    // tagTypes:['Departments', 'Locations' , 'Sections','Benefits'],
    tagTypes:['Locations', 'Benefits' , 'Deductions' , 'Jobs' , 'Departments' , 'Levels' , 'Sections', 'Employees', 'Users'],
    endpoints: (builder) => ({
        
        // Locations API
        getLocations: builder.query ({
            
            async queryFn(){
                console.log('ashraf')
                try {
                    const locationRef = collection(db, "locations")
                    const querySnapshot = await getDocs(locationRef)
                    let locations = []
                    querySnapshot?.forEach((doc)=>{
                        locations.push({id: doc.id,...doc.data()})
                        return {data: locations}
                    })
                    return {data: locations}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Locations"],
        }),
        fetchLocation: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'locations', id)
                    const snapshot = await getDoc(docRef)
                    return {data: snapshot.data()}

                } catch (error) {
                    
                }
            },
            providesTags: ["Locations"],
        }),
        createLocation: builder.mutation({
            async queryFn(data) {
                try {
                    // await addDoc(collection(db, "locations"),{
                    //     id:data.id,
                    //     ...data,
                    //     timestamp: serverTimestamp(),
                    // })
                    
                    // console.log('data=',data)
                    const adminRef = doc(db, 'locations', data.id);
                    await setDoc(adminRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Locations'],
        }),
        deleteLocation: builder.mutation({
            async queryFn(id) {
                // console.log('id=', id)
                try {
                    await deleteDoc(doc(db,'locations', id))

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Locations'],
        }),
        updateLocation: builder.mutation({
            async queryFn({id, values}) {
                console.log('id======', id)
                console.log('data======', values)
                try {
                    await updateDoc(doc(db,'locations', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Locations'],
        }),

         // Benefits API
         getBenefits: builder.query ({
            
            async queryFn(){
                console.log('ashraf')
                try {
                    const docRef = collection(db, "benefits")
                    const querySnapshot = await getDocs(docRef)
                    let benefits = []
                    querySnapshot?.forEach((doc)=>{
                        benefits.push({id: doc.id,...doc.data()})
                        return {data: benefits}
                    })
                    return {data: benefits}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Benefits"],
        }),
        fetchBenefit: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'benefits', id)
                    const snapshot = await getDoc(docRef)
                    return {data: snapshot.data()}

                } catch (error) {
                    
                }
            },
            providesTags: ["Benefits"],
        }),
        createBenefit: builder.mutation({
            async queryFn(data) {
                try {
                    const docRef = doc(db, 'benefits', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Benefits'],
        }),
        deleteBenefit: builder.mutation({
            async queryFn(id) {
                console.log('id=', id)
                try {
                    await deleteDoc(doc(db,'benefits', id))
                    console.log('check delete benefits')

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Benefits'],
        }),
        updateBenefit: builder.mutation({
            async queryFn({id, values}) {
                try {
                    await updateDoc(doc(db,'benefits', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Benefits'],
        }),

         // Deductions API
         getDeductions: builder.query ({
            
            async queryFn(){
                try {
                    const docRef = collection(db, "deductions")
                    const querySnapshot = await getDocs(docRef)
                    let deductions = []
                    querySnapshot?.forEach((doc)=>{
                        deductions.push({id: doc.id,...doc.data()})
                        return {data: deductions}
                    })
                    return {data: deductions}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Deductions"],
        }),
        fetchDeduction: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'deductions', id)
                    const snapshot = await getDoc(docRef)
                    return {data: snapshot.data()}

                } catch (error) {
                    
                }
            },
            providesTags: ["Deductions"],
        }),
        createDeduction: builder.mutation({
            async queryFn(data) {
                try {
                    const docRef = doc(db, 'deductions', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Deductions'],
        }),
        deleteDeduction: builder.mutation({
            async queryFn(id) {
               
                try {
                    await deleteDoc(doc(db,'deductions', id))
                

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Deductions'],
        }),
        updateDeduction: builder.mutation({
            async queryFn({id, values}) {
                try {
                    await updateDoc(doc(db,'deductions', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Deductions'],
        }),

          // Jobs API
          getJobs: builder.query ({
            async queryFn(){
                try {
                    const docRef = collection(db, "jobs")
                    const querySnapshot = await getDocs(docRef)
                    let jobs = []
                    querySnapshot?.forEach((doc)=>{
                        jobs.push({id: doc.id,...doc.data()})
                        return {data: jobs}
                    })
                    return {data: jobs}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Jobs"],
        }),
        fetchJob: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'jobs', id)
                    const snapshot = await getDoc(docRef)
                    return {data: snapshot.data()}

                } catch (error) {
                    
                }
            },
            providesTags: ["Jobs"],
        }),
        createJob: builder.mutation({
            async queryFn(data) {
                try {
                    const docRef = doc(db, 'jobs', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Jobs'],
        }),
        deleteJob: builder.mutation({
            async queryFn(id) {
               
                try {
                    await deleteDoc(doc(db,'jobs', id))
                

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Jobs'],
        }),
        updateJob: builder.mutation({
            async queryFn({id, values}) {
                try {
                    await updateDoc(doc(db,'jobs', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Jobs'],
        }),

           // Departments API
           getDepartments: builder.query ({
            async queryFn(){
                try {
                    const docRef = collection(db, "departments")
                    const querySnapshot = await getDocs(docRef)
                    let departments = []
                    querySnapshot?.forEach((doc)=>{
                        departments.push({id: doc.id,...doc.data()})
                        return {data: departments}
                    })
                    return {data: departments}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Departments"],
        }),
        fetchDepartment: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'departments', id)
                    const snapshot = await getDoc(docRef)
                    return {data: snapshot.data()}

                } catch (error) {
                    
                }
            },
            providesTags: ["Departments"],
        }),
        createDepartment: builder.mutation({
            async queryFn(data) {
                try {
                    const docRef = doc(db, 'departments', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Departments'],
        }),
        deleteDepartment: builder.mutation({
            async queryFn(id) {
               
                try {
                    await deleteDoc(doc(db,'departments', id))
                

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Departments'],
        }),
        updateDepartment: builder.mutation({
            async queryFn({id, values}) {
                try {
                    await updateDoc(doc(db,'departments', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Departments'],
        }),

           // Levels API
           getLevels: builder.query ({
            async queryFn(){
                try {
                    const docRef = collection(db, "levels")
                    const querySnapshot = await getDocs(docRef)
                    let levels = []
                    querySnapshot?.forEach((doc)=>{
                        levels.push({id: doc.id,...doc.data()})
                        return {data: levels}
                    })
                    return {data: levels}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Levels"],
        }),
        fetchLevel: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'levels', id)
                    const snapshot = await getDoc(docRef)
                    return {data: snapshot.data()}

                } catch (error) {
                    
                }
            },
            providesTags: ["Levels"],
        }),
        createLevel: builder.mutation({
            async queryFn(data) {
                try {
                    const docRef = doc(db, 'levels', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Levels'],
        }),
        deleteLevel: builder.mutation({
            async queryFn(id) {
               
                try {
                    await deleteDoc(doc(db,'levels', id))
                

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Levels'],
        }),
        updateLevel: builder.mutation({
            async queryFn({id, values}) {
                try {
                    await updateDoc(doc(db,'levels', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Levels'],
        }),

           // Sections API
           getSections: builder.query ({
            async queryFn(){
                try {
                    const docRef = collection(db, "sections")
                    const querySnapshot = await getDocs(docRef)
                    let sections = []
                    querySnapshot?.forEach((doc)=>{
                        sections.push({id: doc.id,...doc.data()})
                        return {data: sections}
                    })
                    return {data: sections}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Sections"],
        }),
        fetchSection: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'sections', id)
                    const snapshot = await getDoc(docRef)
                    return {data: snapshot.data()}

                } catch (error) {
                    
                }
            },
            providesTags: ["Sections"],
        }),
        createSection: builder.mutation({
            async queryFn(data) {
                try {
                    console.log('data in creat section = ',typeof data)
                    const docRef = doc(db, 'sections', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Sections'],
        }),
        deleteSection: builder.mutation({
            async queryFn(id) {
               
                try {
                    await deleteDoc(doc(db,'sections', id))
                

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Sections'],
        }),
        updateSection: builder.mutation({
            async queryFn({id, values}) {
                try {
                    await updateDoc(doc(db,'sections', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Sections'],
        }),
        // Employees API
        getEmployees: builder.query ({
            async queryFn(){
                try {
                    const docRef = collection(db, "employees")
                    const querySnapshot = await getDocs(docRef)
                    let employees = []
                    querySnapshot?.forEach((doc)=>{
                        employees.push({id: doc.id,...doc.data()})
                        return {data: employees}
                    })
                    return {data: employees}
                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Employees"],
        }),
        fetchEmployee: builder.query({

            async queryFn({id}) {
                console.log(' we are in fetch employee ', id)
                try {
                   
                    const docRef = doc(db, 'employees', id)
                    
                    const snapshot = await getDoc(docRef)
                    console.log('snapshot =',snapshot.data())
                    return {data: snapshot.data()}
                    
                } catch (error) {
                    console.log('ERROR  in fetch employee ERROR', error)
                }
            },
            // immer: false,
            providesTags: ["Employees"],
        }),
        createEmployee: builder.mutation({
            async queryFn(data) {
                try {
                    console.log('data in creat employee = ',typeof data)
                    const docRef = doc(db, 'employees', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    console.log(err,'ERROR')
                    return {error :err}
                }
            },
            invalidatesTags: ['Employees'],
        }),
        deleteEmployee: builder.mutation({
            async queryFn(id) {
               
                try {
                    await deleteDoc(doc(db,'employees', id))
                

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Employees'],
        }),
        updateEmployee: builder.mutation({
            async queryFn({id, values}) {
                try {
                    await updateDoc(doc(db,'employees', id), {
                        ...values,
                        createdAt: serverTimestamp()
                    })

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Employees'],
        }),

        // Users API
        getUsers: builder.query ({
            async queryFn(){
                try {
                    // const docRef = auth
                    // console.log('docRef = ', docRef)
                    const docRef = collection(db, "users")
                    const querySnapshot = await getDocs(docRef)
                    
                    let users = []
                    querySnapshot?.forEach((doc)=>{
                        users.push({id: doc.id,...doc.data()})
                        return {data: users}
                    })
                    return {data: users}

                } catch (err) {
                    return {error :err}
                }
            },
            providesTags: ["Users"],
        }),
       
        fetchUser: builder.query({
            async queryFn(id) {
                console.log("id in Api =",id)
                try {
                    const docRef = doc(db, "users", id);
                    const snapshot = await getDoc(docRef);
                    console.log('snapshot.data = ',snapshot.data())
                    if (snapshot.exists()) {
                        console.log("Document data:", snapshot.data());
                    } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                    }

                    return { data: snapshot.data() };

                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ["Users"],
        }),
        fetchUserByEmail: builder.query({
            async queryFn(email) {
                console.log("email in Api =",email)
                try {
                    const docRef = doc(db, "users", email);
                    const snapshot = await getDoc(docRef);
                    console.log('snapshot.data = ',snapshot.data())
                    if (snapshot.exists()) {
                        console.log("Document data:", snapshot.data());
                    } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                    }

                    return { data: snapshot.data() };

                } catch (error) {
                    console.log(error)
                }
            },
            providesTags: ["Users"],
        }),
        createUser: builder.mutation({
            async queryFn(data) {
                try {
                    console.log('data in creat user = ', data)
                    console.log('data in creat user id = ', data.id)
                    const docRef = doc(db, 'users', data.id);
                    await setDoc(docRef, {...data,createdAt: serverTimestamp()})

                    return {data: 'ok'}
                } catch (err) {
                    return {error :err}
                }
            },
            // change date format 
            // locations.createdAt.toDate().toLocalString()
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            async queryFn(id) {
                
                // try {
                //     await deleteDoc(doc(db,'users', id))
                //     return {data: 'ok'}
                // } catch (err) {
                //     return {error :err}
                // }
                try {
                    await updateDoc(doc(db,'users', id), {
                        // ...data,
                        active:false,
                        createdAt: serverTimestamp(),
                    })
                    console.log('DONE   =')

                    return {data: 'ok'}
                } catch (err) {
                    console.log('error=',err)
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            async queryFn({id, data}) {
                console.log('data in update', data)
                try {
                    await updateDoc(doc(db,'users', id), {
                        ...data,
                        createdAt: serverTimestamp(),
                    })
                    console.log('DONE   =')

                    return {data: 'ok'}
                } catch (err) {
                    console.log('error=',err)
                    return {error :err}
                }
            },
            
            invalidatesTags: ['Users'],
        }),
    }),   

})


export const { 
            useGetDepartmentsQuery,  
            useFetchDepartmentQuery,
            useCreateDepartmentMutation, 
            useUpdateDepartmentMutation,
            useDeleteDepartmentMutation,
            useGetDepartmentByIdQuery,

            useGetLocationsQuery, 
            useFetchLocationQuery,
            useCreateLocationMutation, 
            useUpdateLocationMutation,
            useDeleteLocationMutation,
            
            useGetBenefitsQuery,
            useFetchBenefitQuery,
            useCreateBenefitMutation,
            useUpdateBenefitMutation,
            useDeleteBenefitMutation,

            
            useGetDeductionsQuery,
            useFetchDeductionQuery,
            useCreateDeductionMutation,
            useUpdateDeductionMutation,
            useDeleteDeductionMutation,

            useGetJobsQuery,
            useFetchJobQuery,
            useCreateJobMutation,
            useUpdateJobMutation,
            useDeleteJobMutation,
                        
            useGetSectionsQuery,
            useFetchSectionQuery,
            useCreateSectionMutation,
            useUpdateSectionMutation,
            useDeleteSectionMutation,


            useGetLevelsQuery,
            useFetchLevelQuery,
            useCreateLevelMutation,
            useUpdateLevelMutation,
            useDeleteLevelMutation,
            
            useGetEmployeesQuery,
            useFetchEmployeeQuery,
            useCreateEmployeeMutation,
            useUpdateEmployeeMutation,
            useDeleteEmployeeMutation,

            useGetUsersQuery,
            useFetchUserQuery,
            useFetchUserByEmailQuery,
            useCreateUserMutation,
            useUpdateUserMutation,
            useDeleteUserMutation,
            
            
           

        } = firebaseApi;
