module Jekyll
    class TagGenerator < Generator
        def generate(site)
            # Exit if not in production mode
            return unless ENV['JEKYLL_ENV'] == 'production'

            tags = {}

            # Iterate through all posts
            site.posts.docs.each do |post|
                post.data['tags'].each do |tag|
                    # Add the post to the corresponding tag
                    tags[tag] ||= []
                    tags[tag] << post
                end
            end

            # Create a markdown file for each tag
            tags.each do |tag, posts|
                # slugify the tag
                tag_dir = tag.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
                # create a new directory if it doesn't exist
                Dir.mkdir(File.join(site.source, "tags", "#{tag_dir}")) unless File.directory?(File.join(site.source, "tags", "#{tag_dir}"))
                File.open(File.join(site.source, "tags", "#{tag_dir}", "index.md"), "w") do |file|
                    file.puts "---"
                    file.puts "layout: tag"
                    file.puts "title: \"Tag: #{tag}\""
                    file.puts "tag: #{tag}"
                    file.puts "---"
                end
            end
        end
    end
end