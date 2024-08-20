'use client';

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

type RatingUser = {
  name: string;
}

export default function SelectUsersToRate() {
  const [usersToAdd, setUsersToAdd] = useState<RatingUser[]>([
    {
      name: 'Henrique Lira'
    },
    {
      name: 'Paulo Roberto Bassalobe Da Cunha'
    },
    {
      name: 'Lucas Carrieri Sharau'
    },
    {
      name: 'Luis Felipe Fernandes Dos Santos'
    },
    {
      name: 'Humberto Alves De Oliveira'
    },
    {
      name: 'Leticia Puttini'
    },
  ]);
  const [usersSelected, setUsersSelected] = useState<RatingUser[]>([]);

  function addUser(user: RatingUser, indexUser: number) {
    setUsersToAdd((prev) => {
      const removeUser = prev.filter((user, index) => index != indexUser);

      return removeUser;
    });

    setUsersSelected((prev) => [
      ...prev,
      user
    ]);
  }

  function removeUser(user: RatingUser, indexUser: number) {
    setUsersSelected((prev) => {
      const removeUser = prev.filter((user, index) => index != indexUser);

      return removeUser;
    });

    setUsersToAdd((prev) => [
      ...prev,
      user
    ]);
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-50 to-indigo-200 flex items-center justify-center">
      <div className="container border rounded-md bg-slate-50 shadow-sm flex flex-col gap-4">
        <div className="border-b p-4">
          <p className="font-semibold text-lg">Selecionar usuários para avaliar</p>
        </div>

        <div className="grid grid-cols-2 gap-16 px-4 mt-4 relative">
          <div className="rounded-md border relative pt-5">
            <div className="absolute left-0 -top-3 px-4 flex justify-between items-center w-full">
              <p className="bg-slate-50 font-semibold flex gap-2 items-baseline"><FaUser /> Usuários disponíveis</p>

              <div className="border shadow-sm rounded-md h-8 w-10 bg-slate-50 flex justify-center items-center -mt-2">
                <span className="font-medium">{usersToAdd.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 max-h-72 overflow-y-auto">
              {usersToAdd.map((user, index) => (
                <div
                  key={index}
                  onClick={_ => addUser(user, index)}
                  className="flex items-center justify-between rounded-md border p-4 shadow-sm cursor-pointer transition-all group hover:scale-[102%] active:scale-95">
                  <p className="text-ellipsis text-nowrap overflow-hidden w-4/5">{user.name}</p>
                  <IoMdAddCircleOutline size={22} className="group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <HiOutlineArrowsRightLeft className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={22} />

          <div className="rounded-md border relative pt-5">
            <div className="absolute left-0 -top-3 px-4 flex justify-between items-center w-full">
              <p className="bg-slate-50 font-semibold flex gap-2 items-baseline"><FaUser /> Usuários selecionados</p>

              <div className="border shadow-sm rounded-md h-8 w-10 bg-slate-50 flex justify-center items-center -mt-2">
                <span className="font-medium">{usersSelected.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 max-h-72 overflow-y-auto">
              {usersSelected.map((user, index) => (
                <div
                  key={index}
                  onClick={_ => removeUser(user, index)}
                  className="flex items-center justify-between rounded-md border p-4 shadow-sm cursor-pointer transition-all group hover:scale-[102%] active:scale-95">
                  <p className="text-ellipsis text-nowrap overflow-hidden w-4/5">{user.name}</p>
                  <IoMdRemoveCircleOutline size={22} className="group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 pt-0">
          <button className="px-4 py-2 border rounded-md ml-auto block transition-colors bg-purple-600 text-slate-50 hover:bg-purple-800">Avançar</button>
        </div>
      </div>
    </div>
  )
}
