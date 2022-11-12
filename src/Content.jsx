import React, { useState } from "react";

export default function Content() {
    const [keyValue, setNumber] = useState(0)
    const [image, setImage] = useState("")
    //for form output values
    const [allValues, setValues] = useState([{
        image: "",
        name: "",
        email: "",
        gender: "",
        hobbies: false,
        place: "",
        id: 0
    }])

    //to display values
    const [display, setDisplay] = useState([])

    //onchange function event
    function changedValues(e) {
        setValues((newValue) => {
            return (
                { ...newValue, [e.target.name]: (e.target.type === "checkbox") ? e.target.checked : e.target.value }
            )
        })
    }

    //display file type input image
    function newimageUpload(e) {
        setImage(
            URL.createObjectURL(e.target.files[0])
        )
    }

    let check = ""
    //onsubmit function to display the input
    function finalList(e) {
        e.preventDefault()
        setNumber((num) => { return (num + 1) })
        if (allValues.hobbies == true) {
            check = "checkbox selected"
        } else {
            check = "checkbox not selected"
        }
        setDisplay((greenBox) => {
            return (
                [
                    ...greenBox,
                    {
                        image: image,
                        name: allValues.name,
                        email: allValues.email,
                        gender: allValues.gender,
                        hobbies: check,
                        place: allValues.place,
                        id: keyValue
                    }
                ]
            )
        })
    }

    return (
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center h-screen space-y-5 lg:space-y-0 lg:space-x-5">
            <div className="w-full md:w-2/4 bg-green-200 border-2 rounded-lg p-6 flex flex-col">
                <form className="space-y-5 font-medium" onSubmit={finalList}>
                    <div>
                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Name
                            </span>
                            <input type="text" name="name" className="mt-1 px-3 py-2 bg-white placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-2" placeholder="Enter your name" required value={allValues.name} onChange={changedValues} />
                        </label>
                    </div>
                    <div>
                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Email
                            </span>
                            <input type="email" name="email" className="mt-1 px-3 py-2 bg-white placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-2" placeholder="you@example.com" required value={allValues.mail} onChange={changedValues} />
                        </label>
                    </div>
                    <div>
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-2">
                            Gender
                        </span>
                        <div className="flex flex-row space-x-4">
                            <input id="draft" className="peer/draft" type="radio"
                                name="gender"
                                checked={allValues.gender === "male"}
                                onChange={changedValues}
                                value="male" />
                            <label htmlFor="draft" className="peer-checked/draft:text-green-900">Male</label>

                            <input id="published" className="peer/published" type="radio"
                                name="gender"
                                checked={allValues.gender === "female"}
                                onChange={changedValues}
                                value="female" />
                            <label htmlFor="published" className="peer-checked/published:text-green-900">Female</label>
                        </div>
                    </div>
                    <div>
                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-2">
                                Profile image
                            </span>
                            <input type="file" className="block w-full text-sm text-slate-700
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-white file:text-green-900
                            hover:file:bg-green-50
                          " name="image" onChange={newimageUpload} />
                        </label>
                    </div>
                    <div>
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1">
                            Interest
                        </span>
                        <div className="flex flex-row space-x-4">
                            <label className="block">
                                <input type="checkbox" id="vehicle1"
                                    name="hobbies"
                                    value="playing"
                                    className="mr-2"
                                    checked={allValues.hobbies}
                                    onChange={changedValues} />
                                Playing
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block">
                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Place
                            </span>
                            <select name="place" id="cars" className="mt-1 px-3 py-2 bg-white placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-2" value={allValues.place} onChange={changedValues}>
                                <option value="Chennai">Chennai</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Kochi">Kochi</option>
                            </select>
                        </label>
                    </div>
                    <button className="bg-green-600 text-white hover:bg-green-700 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 tracking-widest w-full rounded-md h-10">
                        Submit
                    </button>
                </form>
            </div>
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {display && display.map((outputs) => {
                    return (
                        <div className="bg-green-50" key={outputs.id}>
                            <div className="shrink-0">
                                <img className="h-16 w-16 object-cover rounded-full" src={outputs.image} alt="Current profile photo" />
                            </div>
                            <b>Name: </b><pre>{outputs.name}</pre>
                            <b>Mail: </b><pre>{outputs.email}</pre>
                            <b>Gender: </b><pre>{outputs.gender}</pre>
                            <b>Interest: </b><pre>{outputs.hobbies}</pre>
                            <b>Place: </b><pre>{outputs.place}</pre>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}