<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTutorialRequest extends FormRequest
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
    public function rules()
    {
        return [
            'titre' => 'required|string|max:255',
            'Sub_Category_id' => 'required|exists:subcategories,id',
            'user_id' => 'required|exists:users,id',
            'cover' => 'nullable|image',
            'description' => 'required|string',
            'media' => 'array',
            'media.*.file' => 'required|file|max:20480', // Adjust max size as needed
            'media.*.description' => 'required|string',
            'media.*.order' => 'required|integer',
        ];
    }

}
