<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $this->user->id,  // Ensure this is correct
            'adresse' => 'sometimes|string|max:255',
            'password' => 'nullable|string|min:8',
            'role_id' => 'sometimes|integer|exists:roles,id',
            'level_id' => 'sometimes|integer|exists:levels,id',
            'profile_picture' => 'image|nullable|max:2048|mimes:jpeg,png,jpg,svg',
        ];
    }
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->isEmptyUpdate()) {
                $validator->errors()->add('field', 'At least one field must be updated.');
            }
        });
    }

    private function isEmptyUpdate()
{
    // Assuming you want to check if all the fields are empty or unchanged
    $all = $this->all();
    unset($all['_token'], $all['_method']); // Remove tokens and methods if not needed in the comparison

    return empty(array_filter($all)); // returns true if all values are empty
}
}
